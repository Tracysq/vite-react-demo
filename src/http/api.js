//导入我们封装好的axios 
import service from './index'

export const apiGetData = info => service.post('/core_control/api/v2/display/get_data', info);
