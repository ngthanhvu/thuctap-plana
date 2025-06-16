const axios = require('axios');
const db = require('../models');
const cacheService = require('../services/cache.service');

const Setting = db.Setting;
const CACHE_KEYS = {
    QR_INFO: 'settings:qr_info'
};

exports.generateVietQR = async (req, res) => {
    try {
        const { amount, addInfo } = req.body;
        if (!amount || !addInfo) {
            return res.status(400).json({ message: 'Thiếu amount hoặc addInfo' });
        }

        let config = await cacheService.get(CACHE_KEYS.QR_INFO);
        if (!config) {
            const settings = await Setting.findAll({ where: { key: ['bank_code', 'bank_account_no', 'bank_account_name', 'qr_template'] } });
            config = Object.fromEntries(settings.map(s => [s.key, s.value]));
            await cacheService.set(CACHE_KEYS.QR_INFO, config, 3600);
        }

        if (!config.bank_code || !config.bank_account_no || !config.bank_account_name) {
            return res.status(400).json({ message: 'Thiếu cấu hình tài khoản ngân hàng' });
        }

        const response = await axios.post('https://api.vietqr.io/v2/generate', {
            accountNo: config.bank_account_no,
            accountName: config.bank_account_name,
            acqId: config.bank_code,
            amount,
            addInfo,
            template: config.qr_template || 'compact'
        });

        if (response.data?.code === '00') {
            return res.json({
                qrData: response.data.data.qrData,
                image: response.data.data.image
            });
        }

        return res.status(400).json({ message: 'VietQR trả về lỗi', detail: response.data });
    } catch (error) {
        console.error('Lỗi khi tạo mã QR:', error.message);
        res.status(500).json({ message: 'Lỗi server khi tạo QR' });
    }
};
