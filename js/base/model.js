window.Model = function(options){
    let resourceName = options.resourceName
    return {
        initAV: function () {
            var APP_ID = 'fBaLVycKWYBN6z14CuECydXT-gzGzoHsz';
            var APP_KEY = 'vhia8qPM2LvT1ERPV5xx5KmQ';
            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            });
        },
        //获取数据
        fetch: function () {
            var query = new AV.Query(resourceName);
            return query.find()  //Promise对象
        },
        //创建数据
        save: function (object) {
            var X = AV.Object.extend(resourceName);
            var x = new X();
            return x.save(object)
        }
    }
}