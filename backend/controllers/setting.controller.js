const db = require('../models');
const Setting = db.Setting;
const cacheService = require('../services/cache.service');

const CACHE_KEYS = {
    QR_INFO: 'settings:qr_info'
};
const CACHE_TTL = 3600; // 1 giờ

exports.getQRInfo = async (req, res) => {
    try {
        const cached = await cacheService.get(CACHE_KEYS.QR_INFO);
        if (cached) {
            console.log('📦 QR info loaded from cache');
            return res.status(200).json(cached);
        }

        const keys = ['bank_code', 'bank_account_no', 'bank_account_name', 'qr_template'];
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
