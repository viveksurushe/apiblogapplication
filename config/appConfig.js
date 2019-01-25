let appConfig={};

appConfig.port=3000;
appConfig.allowedCorsOrigin='*';
appConfig.dev='env';
appConfig.db={
    uri:'mongodb://127.0.0.1:27017/blogAppDB'
};
appConfig.apiVersion='/api/v1';

module.exports={
    port:appConfig.port,
    allowedCorsOrigin:appConfig.allowedCorsOrigin,
    dev:appConfig.dev,
    db:appConfig.db,
    apiVersion:appConfig.apiVersion
}//end of module