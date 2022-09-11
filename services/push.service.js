"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushService = void 0;
const request_1 = __importDefault(require("request"));
class PushService {
    constructor() {
        this.app_id = "4159776e-3f8d-4091-9d81-aff8fa8dea08";
        this.server = 'https://onesignal.com/api/v1/notifications';
    }
    sendNotification(ids, title, message, device) {
        const deviceGroup = device.id;
        const deviceAny = device;
        const requestOptions = {
            url: this.server,
            method: 'POST',
            headers: {
                Authorization: 'Basic ZDFmMTgyYTUtOTNmZS00NmMxLTk1MDEtY2UxMDcyYzYyYzM3'
            },
            json: {
                app_id: this.app_id,
                headings: { "en": deviceAny.name },
                // subtitle:  {"en": 'El subtitulo'},
                contents: { "en": message },
                // data: {"abc": 123, "foo": "bar", "event_performed": true, "amount": 12.1},
                // big_picture: 'https://qbit.ryd.com.co:5501/assets/icons/simulacro1.jpeg',
                // buttons: [{"id": "id2", "text": "second button", "icon": "ic_menu_share"}, {"id": "id1", "text": "first button", "icon": "ic_menu_send"}],
                include_external_user_ids: ids,
                // large_icon: 'res/drawable-xxxhdpi/ic_stat_onesignal_default.png',
                large_icon: 'https://qbit.ryd.com.co:5501/assets/icons/simulacro1.jpeg',
                // large_icon: 'www/assets/qbit-comunal.png',
                // android_sound: 'www/assets/devices/residential/ding-dong-bell-doorbell.mp3',
                // android_background_layout: {
                //     large_icon: 'www/assets/qbit-comunal.png',
                //     headings_color: "FFFF0000",
                //     contents_color: "FF00FF00",
                // },
                android_accent_color: "FF00FF00",
                huawei_accent_color: "FF00FF00",
                huawei_led_color: "FF0000",
                android_group: deviceGroup.toString(),
            },
            qs: {}
        };
        return new Promise((resolve, reject) => {
            (0, request_1.default)(requestOptions, (err, response, body) => {
                if (err) {
                    reject(err);
                }
                else if (response.statusCode === 200) {
                    resolve(body);
                }
                else {
                    reject(response.statusCode);
                }
            });
        });
    }
}
exports.PushService = PushService;
