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
        console.log('📝 Request data:', { amount, addInfo });

        if (!amount || !addInfo) {
            return res.status(400).json({ message: 'Thiếu amount hoặc addInfo' });
        }

        let config = await cacheService.get(CACHE_KEYS.QR_INFO);
        console.log('🔍 Cache config:', config);

        if (!config) {
            const settings = await Setting.findAll({ where: { key: ['bank_code', 'bank_account_no', 'bank_account_name', 'qr_template'] } });
            config = Object.fromEntries(settings.map(s => [s.key, s.value]));
            console.log('📦 Settings from DB:', config);
            await cacheService.set(CACHE_KEYS.QR_INFO, config, 3600);
        }

        if (!config.bank_code || !config.bank_account_no || !config.bank_account_name) {
            return res.status(400).json({ message: 'Thiếu cấu hình tài khoản ngân hàng' });
        }

        const requestData = {
            accountNo: config.bank_account_no,
            accountName: config.bank_account_name,
            acqId: config.bank_code,
            amount,
            addInfo,
            template: config.qr_template || 'compact'
        };
        console.log('🚀 Request to VietQR:', requestData);

        const response = await axios.post('https://api.vietqr.io/v2/generate', requestData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-client-id': '9cfcd6a5-8911-448f-a760-a09613338d4a',
                'x-api-key': '1055c7bd-d3d4-4ce2-b5f5-46e6b24f3b64'
            }
        });

        if (response.data?.code === '00' && response.data?.data) {
            const { qrCode, qrDataURL } = response.data.data;
            if (!qrCode || !qrDataURL) {
                return res.status(500).json({
                    code: '99',
                    desc: 'Dữ liệu QR không hợp lệ từ VietQR',
                    data: response.data
                });
            }

            return res.json({
                code: '00',
                desc: 'Success',
                data: {
                    qrCode: qrCode,
                    qrDataURL: qrDataURL
                }
            });
        }

        return res.status(400).json({
            code: response.data?.code || '99',
            desc: response.data?.desc || 'VietQR trả về lỗi',
            data: response.data
        });
    } catch (error) {
        console.error('❌ Lỗi khi tạo mã QR:', error.message);
        if (error.response) {
            console.error('❌ VietQR error status:', error.response.status);
        }
        res.status(500).json({
            code: '99',
            desc: 'Lỗi server khi tạo QR',
            data: {
                error: error.message,
                response: error.response?.data
            }
        });
    }
};
