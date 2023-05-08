<template>
  <div class="employee-page">
    <div class="top-panel">
      <el-input placeholder="输入关键词查询" v-model="keyWord"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="searchStaffInfoByKeyWord()">查找</el-button>
      <el-button type="primary" plain @click="resetData()">重置</el-button>
      <el-button type="danger" plain @click="del(selectData)">批量删除</el-button>
      <el-button plain @click="exportToExcel()">导出</el-button>
    </div>
    <el-table id="selectTable" :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="员工照片: ">
              <el-image style="width: 100px; height: 100px" :src="props.row.avatar"
                :preview-src-list="[props.row.avatar]"></el-image>
            </el-form-item>
            <el-form-item label="劳动合同: ">
              <el-image style="width: 100px; height: 100px" :src="props.row.labor_contract"
                :preview-src-list="[props.row.labor_contract]"></el-image>
            </el-form-item>
            <el-form-item label="邮箱: ">
              <span>{{ props.row.email }}</span>
            </el-form-item>
            <el-form-item label="基本薪资: ">
              <span>{{ props.row.basic_salary }}</span>
            </el-form-item>
            <el-form-item label="紧急联系人: ">
              <span>{{ props.row.emergency_contact_person }}</span>
            </el-form-item>
            <el-form-item label="紧急联系人电话: ">
              <span>{{ props.row.emergency_contact_phone }}</span>
            </el-form-item>
            <el-form-item label="生日: ">
              <span>{{ props.row.birthday }}</span>
            </el-form-item>
            <el-form-item label="家庭地址: ">
              <span>{{ props.row.home_address }}</span>
            </el-form-item>
            <el-form-item label="毕业院校: ">
              <span>{{ props.row.school }}</span>
            </el-form-item>
            <el-form-item label="毕业院校地址: ">
              <span>{{ props.row.school_address }}</span>
            </el-form-item>
            <el-form-item label="专业: ">
              <span>{{ props.row.major }}</span>
            </el-form-item>
            <el-form-item label="学历: ">
              <span>{{ props.row.edu_bg }}</span>
            </el-form-item>
            <el-form-item label="技能: ">
              <span>{{ props.row.pro_skills }}</span>
            </el-form-item>
            <el-form-item label="校园经历: ">
              <span>{{ props.row.campus_experience }}</span>
            </el-form-item>
            <el-form-item label="项目经历: ">
              <span>{{ props.row.project_experience }}</span>
            </el-form-item>
            <el-form-item label="工作经历: ">
              <span>{{ props.row.work_experience }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="code" label="工号">
      </el-table-column>
      <el-table-column prop="name" label="姓名">
      </el-table-column>
      <el-table-column prop="service_status" label="在职情况" :filters="[{ text: '离职', value: 0 }, { text: '在职', value: 1 }]"
        :filter-method="filterServiceStatus" filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.service_status == 0 ? 'danger' : 'success'" disable-transitions>{{
            scope.row.service_status == 0 ? '离职' : '在职' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="apply_status" label="认证情况" :filters="[{ text: '未认证', value: 0 }, { text: '已认证', value: 1 }]"
        :filter-method="filterApplyStatus" filter-placement="bottom-end">
        <template slot-scope="scope">
          <el-tag :type="scope.row.apply_status === 1 ? 'success' : (scope.row.apply_status === -1 ? 'info' : 'danger')"
            disable-transitions>{{
              scope.row.apply_status === 1 ? '已认证' : (scope.row.apply_status === -1 ? '已冻结' : '未认证') }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="gender" label="性别">
        <template slot-scope="scope">
          <span>{{ scope.row.gender == 1 ? '女' : '男' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="id_number" label="身份证号">
      </el-table-column>
      <el-table-column prop="phone" label="电话">
      </el-table-column>
      <el-table-column prop="job" label="职位">
      </el-table-column>
      <el-table-column prop="department" label="部门">
      </el-table-column>
      <el-table-column prop="dormitory" label="宿舍">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
          <!-- <el-button type="text" size="small" @click="lookMoreStaffInfo(scope.row.id)">查看更多</el-button> -->
          <el-button type="text" size="small" v-if="scope.row.apply_status === 0"
            @click="pass(scope.row)" style="margin-right: 10px;">通过认证</el-button>
          <el-button type="text" size="small" v-if="scope.row.apply_status === -1" @click="pass(scope.row)" style="margin-right: 10px;">解冻</el-button>
          <template>
            <el-popconfirm confirm-button-text='确定' cancel-button-text='取消' @confirm="freeze(scope.row)" icon="el-icon-info" icon-color="red"
              title="确定冻结当前员工账号吗？">
              <!-- <el-button slot="reference">删除</el-button> -->
              <el-button slot="reference" type="text" size="small"
                v-if="scope.row.apply_status === 1 && scope.row.service_status != 0"
                style="margin-right: 10px;">冻结账号</el-button>
            </el-popconfirm>
          </template>
          <!-- <el-button type="text" size="small" v-if="scope.row.apply_status === 1 && scope.row.service_status != 0"
            @click="freeze(scope.row)">冻结账号</el-button> -->
          <el-button type="text" size="small" v-if="scope.row.apply_status === 1 && scope.row.service_status != 0"
            @click="edit(scope.row)" style="margin-right: 10px;">编辑信息</el-button>
          <el-button type="text" size="small" style="color: #f56c6c; margin-right: 10px;" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑用户信息的对话框 -->
    <el-dialog :visible.sync="dialogVisible" title="编辑用户信息">
      <el-form ref="editForm" :model="editData" label-width="120px">
        <el-form-item label="员工照片">
          <!-- <el-input v-model="formLabelAlign.name"></el-input> -->
          <el-upload class="avatar-uploader" action="#" :show-file-list="false" :http-request="uploadHttp1">
            <img v-if="editData.avatar" :src="editData.avatar" class="_avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="劳动合同">
          <!-- <el-input v-model="formLabelAlign.name"></el-input> -->
          <el-upload class="avatar-uploader" action="#" :show-file-list="false" :http-request="uploadHttp2">
            <img v-if="editData.labor_contract" :src="editData.labor_contract" class="_avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="工号" prop="code">
          <el-input v-model="editData.code"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editData.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="id_number">
          <el-input v-model="editData.id_number"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <!-- <el-input v-model="editData.id_number"></el-input> -->
          <el-radio v-model="editData.gender" label="1">女</el-radio>
          <el-radio v-model="editData.gender" label="2">男</el-radio>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="editData.phone"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="job">
          <el-input v-model="editData.job"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="editData.department"></el-input>
        </el-form-item>
        <el-form-item label="宿舍" prop="dormitory">
          <el-input v-model="editData.dormitory"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editData.email"></el-input>
        </el-form-item>
        <el-form-item label="基本薪资" prop="basic_salary">
          <el-input v-model="editData.basic_salary"></el-input>
        </el-form-item>
        <el-form-item label="紧急联系人" prop="emergency_contact_person">
          <el-input v-model="editData.emergency_contact_person"></el-input>
        </el-form-item>
        <el-form-item label="紧急联系人电话" prop="emergency_contact_phone">
          <el-input v-model="editData.emergency_contact_phone"></el-input>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-input v-model="editData.birthday"></el-input>
        </el-form-item>
        <el-form-item label="家庭地址" prop="home_address">
          <el-input v-model="editData.home_address"></el-input>
        </el-form-item>
        <el-form-item label="毕业院校" prop="school">
          <el-input v-model="editData.school"></el-input>
        </el-form-item>
        <el-form-item label="毕业院校地址" prop="school_address">
          <el-input v-model="editData.school_address"></el-input>
        </el-form-item>
        <el-form-item label="专业" prop="major">
          <el-input v-model="editData.major"></el-input>
        </el-form-item>
        <el-form-item label="学历" prop="edu_bg">
          <el-input v-model="editData.edu_bg"></el-input>
        </el-form-item>
        <el-form-item label="技能" prop="pro_skills">
          <el-input type="textarea" :rows="2" v-model="editData.pro_skills"></el-input>
        </el-form-item>
        <el-form-item label="校园经历" prop="campus_experience">
          <el-input type="textarea" :rows="2" v-model="editData.campus_experience"></el-input>
        </el-form-item>
        <el-form-item label="项目经历" prop="project_experience">
          <el-input type="textarea" :rows="2" v-model="editData.project_experience"></el-input>
        </el-form-item>
        <el-form-item label="工作经历" prop="work_experience">
          <el-input type="textarea" :rows="2" v-model="editData.work_experience"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="editUser">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getStaffList, updateStaffInfo, searchStaffInfoByKeyWord, delStaff } from '@/api';
import { put } from '@/utils/alioss';
import { getExcel } from '../../utils/exportsExcel';
export default {
  name: 'employee',
  data() {
    return {
      keyWord: '',  // 查找时输入的员工工号
      selectData: [],
      tableData: [],
      dialogVisible: false,
      editData: {},
    }
  },
  created() {
    this.initData();
  },
  methods: {

    // 更新员工照片
    uploadHttp1(option) {
      console.log(option);
      const fileName = new Date().getTime() + '';
      const loading = this.$loading({
        lock: true,
        text: '图片上传中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      // 调用 ali-oss 中的方法
      put(fileName, option.file).then(res => {
        console.log(res)
        loading.close();
        this.editData.avatar = res.url;
      }).catch(err => {
        loading.close();
      })
    },

    // 更新员工劳动合同
    uploadHttp2(option) {
      console.log(option);
      const fileName = new Date().getTime() + '';
      const loading = this.$loading({
        lock: true,
        text: '图片上传中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      // 调用 ali-oss 中的方法
      put(fileName, option.file).then(res => {
        console.log(res)
        loading.close();
        this.editData.labor_contract = res.url;
      }).catch(err => {
        loading.close();
      })
    },

    // 编辑员工信息
    edit(row) {
      console.log(row);
      // 请帮我使用element-ui的对话框写一个可以编辑用户信息的对话框
      this.editData = Object.assign({}, row)
      this.dialogVisible = true
    },

    editUser() {
      // this.$refs.editForm.validate((valid) => {
      //   if (valid) {
      //     // send AJAX request to update user information 
      //     this.dialogVisible = false
      //   } else {
      //     return false
      //   }
      // })
      updateStaffInfo(this.editData).then(res => {
        console.log(res);
        this.initData();
      })
    },

    // 监听选中行事件
    handleSelectionChange(e) {
      console.log(e);
      this.selectData = e;
    },

    // 删除事件
    del(item) {
      if (item instanceof Array) {
        if (item.length == 0) return;
      }
      this.$confirm('此操作将永久删除该员工账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delStaff(item).then(res => {
          console.log(res);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.initData();
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    // 导出为表格
    exportToExcel() {
      getExcel('#selectTable', '表格');
    },

    searchStaffInfoByKeyWord() {
      if (this.keyWord === '' || this.keyWord === null) {
        return;
      } else {
        searchStaffInfoByKeyWord({ keyWord: this.keyWord }).then(res => {
          this.tableData = [];
          if (res.data.result !== null) {
            // this.initData(res.data.result);
            this.tableData = res.data.result;
            // this.staffJobData.push(res.data.result);
          }
        })
      }
    },

    initData() {
      this.dialogVisible = false;
      getStaffList().then(res => {
        this.tableData = res.data.result;
      }).catch(err => {
        console.log(err);
      });
    },
    // 重置数据
    resetData() {
      this.keyWord = null;
      this.initData();
    },

    // 筛选当前表格的在职情况
    filterServiceStatus(value, row) {
      return row.service_status = value;
    },
    // 筛选当前表格的认证情况
    filterApplyStatus(value, row) {
      // console.log(value, row);
      return row.apply_status === value;
    },
    // 查看更多员工信息
    lookMoreStaffInfo(id) {
      console.log(id);
    },
    // 通过按钮
    pass(row) {
      row = JSON.parse(JSON.stringify(row));
      // console.log(row);
      row.apply_status = 1;
      updateStaffInfo(row).then(res => {
        // console.log(res);
        this.initData();
      })
    },
    // 冻结账号
    freeze(row) {
      // console.log('12123');
      row = JSON.parse(JSON.stringify(row));
      // console.log(row);
      row.apply_status = -1;
      updateStaffInfo(row).then(res => {
        // console.log(res);
        this.initData();
      })
    },
  },
}
</script>

<style lang="less" scoped>
.employee-page {
  display: flex;
  flex-direction: column;

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .top-panel {
    width: 100%;
    // height: 80px;
    line-height: 60px;

    .el-input {
      width: 180px;
      margin-right: 12px;
    }
  }

  .el-dialog {
    display: flex;
    align-items: flex-start;

    .avatar-uploader .el-upload {
      // border: 1px dashed #d9d9d9 !important;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }

    .avatar-uploader-icon {
      border: 1px dashed #d9d9d9 !important;
      font-size: 28px;
      color: #8c939d;
      width: 120px;
      height: 120px;
      line-height: 120px;
      text-align: center;
    }

    ._avatar {
      width: 120px;
      height: 120px;
      display: block;
    }
  }
}
</style>