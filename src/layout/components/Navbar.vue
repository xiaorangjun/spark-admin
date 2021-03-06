<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <search id="header-search" class="right-menu-item" />
        <screenfull id="screenfull" class="right-menu-item hover-effect" />
        <el-tooltip content="布局大小" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>
      </template>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar :src="avatar" class="user-avatar" />
          <span class="user-name">{{ account }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/profile">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item>
            <span style="display:block;" @click="deleteCacheFn">清理缓存</span>
          </el-dropdown-item>
          <a target="_blank" href="https://gitee.com/dreamfeng/spark-platform">
            <el-dropdown-item>Gitee</el-dropdown-item>
          </a>
          <a target="_blank" href="https://github.com/wangdingfeng/spark-platform">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logoutThen">注销</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import SizeSelect from '@/components/SizeSelect'
import Screenfull from '@/components/Screenfull'
import Search from '@/components/HeaderSearch'
import { deleteCache } from '@/api/index.js'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    SizeSelect,
    Screenfull,
    Search
  },
  computed: {
    ...mapGetters(['sidebar', 'device']),
    account() {
      return this.$store.state.user.account
    },
    avatar() {
      if (this.$store.state.user.avatar) return require(`@/assets/avatar/${this.$store.state.user.avatar}`)
      return ''
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    deleteCacheFn() {
      this.$confirm('是否清除缓存?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCache().then(response => {
          this.$notify({
            title: '成功',
            message: '清除成功',
            type: 'success',
            duration: 2000
          })
        })
      })
    },
    logoutThen() {
      this.$confirm('是否确定退出账户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.logout()
      })
    },
    async logout() {
      await this.$store.dispatch('LogOut')
      // 清除所有的缓存数据
      this.$store.dispatch('tagsView/delAllViews', this.$route)
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 5px;
      height: 100%;
      font-size: 16px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
        .user-name {
          position: relative;
          top: -14px;
          cursor: pointer;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
