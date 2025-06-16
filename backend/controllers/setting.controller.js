const db = require('../models');
const Setting = db.Setting;
const cacheService = require('../services/cache.service');

const CACHE_KEYS = {
    QR_INFO: 'settings:qr_info'
};
const CACHE_TTL = 3600; // 1 giờ

// Danh sách mã ngân hàng hợp lệ
const VALID_BANK_CODES = {
    'VCB': '970436', // Vietcombank
    'TCB': '970407', // Techcombank
    'MB': '970422',  // MB Bank
    'ACB': '970416', // ACB
    'VIB': '970441', // VIB
    'BIDV': '970418', // BIDV
    'VPB': '970432', // VPBank
    'SCB': '970429', // SCB
    'HDB': '970437', // HDBank
    'MSB': '970426', // MSB
    'TPB': '970423', // TPBank
    'SHB': '970443', // SHB
    'OCB': '970448', // OCB
    'VAB': '970425', // VietABank
    'NCB': '970419', // NCB
    'SGB': '970400', // SGB
    'BAB': '970409', // BacABank
    'PGB': '970430', // PGBank
    'GPB': '970408', // GPBank
    'AGB': '970405', // Agribank
    'SAC': '970403', // Sacombank
    'VIB': '970441', // VIB
    'EIB': '970431', // Eximbank
    'LPB': '970449', // LienVietPostBank
    'ABB': '970425', // ABBank
    'BVB': '970438', // BaoVietBank
    'VCCB': '970454', // VietCapitalBank
    'KLB': '970452', // KienLongBank
    'NAB': '970428', // NamABank
    'PVB': '970412', // PVcomBank
    'SGB': '970400', // SaigonBank
    'UOB': '970458', // UOB
    'VAB': '970425', // VietABank
    'VIB': '970441', // VIB
    'VNM': '970427', // VietinBank
    'VTB': '970415', // VietBank
    'VCCB': '970454', // VietCapitalBank
    'VDB': '970433', // VietBank
    'VIB': '970441', // VIB
    'VNM': '970427', // VietinBank
    'VTB': '970415'  // VietBank
};

// Thêm hàm khởi tạo settings mặc định
const initializeDefaultSettings = async () => {
    try {
        const defaultSettings = [
            { key: 'bank_code', value: '970436', description: 'Mã ngân hàng Vietcombank' },
            { key: 'bank_account_no', value: '', description: 'Số tài khoản ngân hàng' },
            { key: 'bank_account_name', value: '', description: 'Tên chủ tài khoản' },
            { key: 'bank_branch', value: '', description: 'Chi nhánh ngân hàng' },
            { key: 'bank_note', value: '', description: 'Ghi chú' },
            { key: 'qr_template', value: 'compact', description: 'Template mã QR' }
        ];

        for (const setting of defaultSettings) {
            await Setting.findOrCreate({
                where: { key: setting.key },
                defaults: setting
            });
        }
        console.log('✅ Đã khởi tạo settings mặc định');
    } catch (error) {
        console.error('❌ Lỗi khi khởi tạo settings:', error);
    }
};

// Gọi hàm khởi tạo khi server khởi động
initializeDefaultSettings();

exports.getQRInfo = async (req, res) => {
    try {
        const cached = await cacheService.get(CACHE_KEYS.QR_INFO);
        if (cached) {
            console.log('📦 QR info loaded from cache');
            return res.status(200).json(cached);
        }

        const keys = ['bank_code', 'bank_account_no', 'bank_account_name', 'qr_template', 'bank_branch', 'bank_note'];
        const settings = await Setting.findAll({ where: { key: keys } });
        const result = Object.fromEntries(settings.map(s => [s.key, s.value]));

        if (!result.bank_code || !result.bank_account_no || !result.bank_account_name) {
            return res.status(400).json({ message: 'Thiếu thông tin tài khoản ngân hàng trong settings' });
        }

        await cacheService.set(CACHE_KEYS.QR_INFO, result, CACHE_TTL);
        console.log('💾 QR info cached successfully');
        res.json(result);
    } catch (error) {
        console.error('Lỗi khi lấy QR info:', error.message);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

exports.updateSettings = async (req, res) => {
    try {
        const settings = req.body;
        if (!Array.isArray(settings)) {
            return res.status(400).json({ message: 'Dữ liệu không hợp lệ' });
        }

        const bankNameSetting = settings.find(s => s.key === 'bank_name');
        if (bankNameSetting) {
            const bankCode = VALID_BANK_CODES[bankNameSetting.value];
            if (!bankCode) {
                return res.status(400).json({
                    message: 'Tên ngân hàng không hợp lệ',
                    validBanks: Object.keys(VALID_BANK_CODES)
                });
            }
            settings.push({
                key: 'bank_code',
                value: bankCode
            });
        }

        await cacheService.del(CACHE_KEYS.QR_INFO);

        for (const setting of settings) {
            const { key, value } = setting;
            if (!key) continue;

            const [settingRecord, created] = await Setting.findOrCreate({
                where: { key },
                defaults: { value }
            });

            if (!created) {
                await settingRecord.update({ value });
            }
        }

        res.json({ message: 'Cập nhật settings thành công' });
    } catch (error) {
        console.error('Lỗi khi cập nhật settings:', error.message);
        res.status(500).json({ message: 'Lỗi server khi cập nhật settings' });
    }
};

exports.createSettings = async (req, res) => {
    try {
        const settings = req.body;
        if (!Array.isArray(settings)) {
            return res.status(400).json({ message: 'Dữ liệu không hợp lệ' });
        }

        const bankNameSetting = settings.find(s => s.key === 'bank_name');
        if (bankNameSetting) {
            const bankCode = VALID_BANK_CODES[bankNameSetting.value];
            if (!bankCode) {
                return res.status(400).json({
                    message: 'Tên ngân hàng không hợp lệ',
                    validBanks: Object.keys(VALID_BANK_CODES)
                });
            }
            settings.push({
                key: 'bank_code',
                value: bankCode
            });
        }

        await cacheService.del(CACHE_KEYS.QR_INFO);

        const createdSettings = [];
        for (const setting of settings) {
            const { key, value } = setting;
            if (!key) continue;

            const existingSetting = await Setting.findOne({ where: { key } });
            if (existingSetting) {
                await existingSetting.update({ value });
                createdSettings.push(existingSetting);
            } else {
                const newSetting = await Setting.create({ key, value });
                createdSettings.push(newSetting);
            }
        }

        res.status(201).json({
            message: 'Tạo settings thành công',
            data: createdSettings
        });
    } catch (error) {
        console.error('Lỗi khi tạo settings:', error);
        res.status(500).json({
            message: 'Lỗi server khi tạo settings',
            error: error.message
        });
    }
};
