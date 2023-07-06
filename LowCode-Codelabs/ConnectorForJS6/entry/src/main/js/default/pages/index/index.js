import "@hw-agconnect/lowcode-harmony";
import agconnect from "@hw-agconnect/core-harmony";

export default {
    // Start of auto-generated Super Visual code. DO NOT MODIFY
    refreshgetNewsnews_q8645() {
        agconnect.lowCode().callConnector({
            connectorId: "1187535501163286400", methodName: "getNews", params: JSON.stringify({
                typeId: "537", page: "1", app_id: "zqpgk1jfojqb6ylm", app_secret: "OG8rd0g4ZG8rQzNIVzM5SVc1c04xdz09"
            })
        }).then(res => {
            const ret = res.getValue().ret;
            if (ret.code !== 0) {
                throw new Error(JSON.stringify(ret));
            }
            this.getNewsnews_q8645 = JSON.parse(res.getValue().response);
            this.showNews(res);
        }).catch(e => {
            ;
        });
    },
    // End of auto-generated Super Visual code. DO NOT MODIFY
    data: {
        // Start of auto-generated Super Visual code. DO NOT MODIFY
        getNewsnews_q8645: {
            code: "", msg: "", data: {
                data: [{
                    title: "",
                    imgList: {
                        imgList: [{}]
                    },
                    source: "",
                    newsId: "",
                    digest: "",
                    postTime: "",
                    videoList: ""
                }]
            }
        },
        // End of auto-generated Super Visual code. DO NOT MODIFY
        title: "Codelab之连接器使用",
        news: {
            msg: "",
            code: "",
            data: [{
                title: "",
                imgList: {
                    imgList: [{}]
                },
                source: "",
                newsId: "",
                digest: "",
                postTime: "",
                videoList: ""
            }]
        }
    },
    onInit() {
        // Start of auto-generated Super Visual code. DO NOT MODIFY
        this.refreshgetNewsnews_q8645();
        // End of auto-generated Super Visual code. DO NOT MODIFY
    },
    showNews(res) {
        this.news = this.getNewsnews_q8645;
    }
}