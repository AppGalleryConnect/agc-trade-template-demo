// @ts-nocheck
import "@hw-agconnect/lowcode-harmony";
import agconnect from "@hw-agconnect/core-harmony";

export default {
    // Start of auto-generated Super Visual code. DO NOT MODIFY
    refreshgetDataModelForApi6_qzetu() {
        agconnect.lowCode().callDataModel({
            modelId: "1186938424347623808", methodName: "get", status: 1, params: {
                primaryKey: {
                    field: "id", value: "1"
                }
            }
        }).then(res => {
            const ret = res.getValue().ret;
            if (ret.code !== 0) {
                throw new Error(JSON.stringify(ret));
            }
            this.getDataModelForApi6_qzetu = res.getValue().data.record;
            ;
        }).catch(e => {
            ;
        });
    },
    // End of auto-generated Super Visual code. DO NOT MODIFY
    data: {
        // Start of auto-generated Super Visual code. DO NOT MODIFY
        getDataModelForApi6_qzetu: {
            id: "",
            createTime: "",
            updateTime: "",
            owner: "",
            createBy: "",
            updateBy: "",
            title: "",
            image: "",
            content: ""
        },
        // End of auto-generated Super Visual code. DO NOT MODIFY
    },
    onInit() {
        // Start of auto-generated Super Visual code. DO NOT MODIFY
        this.refreshgetDataModelForApi6_qzetu();
        // End of auto-generated Super Visual code. DO NOT MODIFY
    }
}