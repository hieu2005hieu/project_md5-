import { notification } from "antd";
export const successNoti = (type:any) => {
    notification.success({
        message: type,
        duration: 1,
        style: {
            top: 100,
        },
    });
}
export const errorNoti = (type:any) => {
    notification.error({
        message: type,
        duration: 1,
        style: {
            top: 100,
        },
    });
}
