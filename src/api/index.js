import axios from "../utils/request";

/* 
  get 请求的参数放在 params 中
  post 请求的参数放在 body 中
*/

// 查看管理员工号是否被注册
export function checkAdminCode(data) {
  return axios({
    url: "/api/admin/checkAdminCode",
    method: "get",
    params: data,
  });
}

// 获取邮箱验证码
export function getVerifyCode(data) {
  return axios({
    url: "/api/code",
    method: "get",
    params: data,
  });
}

// 注册接口
export function register(data) {
  return axios({
    url: "/api/register",
    method: "post",
    data,
  });
}

// 登录接口
export function login(data) {
  return axios({
    url: "/api/login",
    method: "post",
    data,
  });
}


// 获取管理员列表
export function getAdminList() {
  return axios({
    url: '/api/admin/getAll',
    method: 'get',
  })
}

// 根据管理员 id 去更新管理员数据
export function updateAdminInfoById(data) {
  return axios({
    url: '/api/admin/update',
    method: 'post',
    data,
  })
}

// 根据管理员 id 删除管理员
export function deleteAdminById(data) {
  return axios({
    url: '/api/admin/del',
    method: 'post',
    data,
  })
}

// 根据管理员工号获取管理员信息
export function getAdminInfoByCode(data) {
  return axios({
    url: '/api/admin/getInfoByCode',
    method: 'get',
    params: data,
  })
}

// 重置密码
export function changePassword(data) {
  return axios({
    url: '/api/admin/changePassword',
    method: 'post',
    data,
  })
}

// 获取员工信息
export function getStaffList(data) {
  return axios({
    url: '/api/staff/getAll',
    method: 'get',
    params: data,
  })
}

// 更新员工信息
export function updateStaffInfo(data) {
  return axios({
    url: '/api/staff/adminUpdate',
    method: 'post',
    data,
  })
}

// 获取所有员工调岗记录
export function getAllStaffJobRecord(data) {
  return axios({
    url: '/api/job/getAll',
    method: 'get',
    params: data,
  })
}

// 通过员工工号查找员工的调岗信息
export function getStaffJobInfoByCode(data) {
  return axios({
    url: '/api/job/getStaffJobInfoByCode',
    method: 'get',
    params: data,
  })
}

export function updateStaffJobInfoByCode(data) {
  return axios({
    url: '/api/job/updateStaffJobInfoByCode',
    method: 'post',
    data,
  })
}

// 更新员工宿舍信息
export function getAllStaffDormitoryRecord(data) {
  return axios({
    url: '/api/dormitory/getAllStaffDormitoryRecord',
    method: 'get',
    params: data,
  });
}
export function getStaffDormitoryInfoByCode(data) {
  return axios({
    url: '/api/dormitory/getStaffDormitoryInfoByCode',
    method: 'get',
    params: data,
  });
}
export function updateStaffDormitoryInfoByCode(data) {
  return axios({
    url: '/api/dormitory/updateStaffDormitoryInfoByCode',
    method: 'post',
    data,
  });
}

// 部门调换审批相关接口
export function getAllStaffDepartmentRecord(data) {
  return axios({
    url: '/api/department/getAllStaffDepartmentRecord',
    method: 'get',
    params: data,
  })
} 

export function getStaffDepartmentInfoByCode(data) {
  return axios({
    url: '/api/department/getStaffDepartmentInfoByCode',
    method: 'get',
    params: data,
  })
}

export function updateStaffDepartmentInfoByCode(data) {
  return axios({
    url: '/api/department/updateStaffDepartmentInfoByCode',
    method: 'post',
    data,
  })
}

// 离职相关的
export function getAllStaffLeaveRecord(data) {
  return axios({
    url: '/api/leave/getAllStaffLeaveRecord',
    method: 'get',
    params: data,
  })
}

export function getStaffLeaveInfoByCode(data) {
  return axios({
    url: '/api/leave/getStaffLeaveInfoByCode',
    method: 'get',
    params: data,
  })
}

export function updateStaffLeaveInfoByCode(data) {
  return axios({
    url: '/api/leave/updateStaffLeaveInfoByCode',
    method: 'post',
    data,
  })
}

// 请假相关
export function getAllStaffVacateRecord(data) {
  return axios({
    url: '/api/vacate/getAllStaffVacateRecord',
    method: 'get',
    params: data,
  })
}
export function getStaffVacateInfoByCode(data) {
  return axios({
    url: '/api/vacate/getStaffVacateInfoByCode',
    method: 'get',
    params: data,
  })
}
export function updateStaffVacateInfoByCode(data) {
  return axios({
    url: '/api/vacate/updateStaffVacateInfoByCode',
    method: 'post',
    data,
  })
}


// 考勤相关
export function getAllStaffAttendanceRecord(data) {
  return axios({
    url: '/api/attendance/getAllStaffAttendanceRecord',
    method: 'get',
    params: data,
  })
}


// 新闻管理相关接口
export function addArticle(data) {
  return axios({
    url: '/api/news/add',
    method: 'post',
    data,
  })
}

export function updateArticle(data) {
  return axios({
    url: '/api/news/update',
    method: 'post',
    data,
  })
}

export function getNewsList(data) {
  return axios({
    url: '/api/news/getNewsList',
    method: 'get',
    params: data,
  })
}