module.exports = {
    //opCode === 'get' 获取应用连接
    'get':require('./AppParamsRMTunnelServer'),
    //opCode === 'server' 服务发现
    'server':require('./VappServerDiscoverServer')
}