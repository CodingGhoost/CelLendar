<script setup>
  import { ElButton, ElMenu, ElMenuItem, ElIcon} from "element-plus";
  import { ref } from "vue";

  const year = ref(new Date().getFullYear());

  const isEditing = ref(false);
  const activeCell = ref('');
  const selectedDay = ref('');
  const selectedColor = ref('');
  const note = ref('');


  const getWeekday = (year, month, day) => {
    const date = new Date(year, month, day); 
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  const months = ref([
    { name: "Jan", days: Array.from({ length: 31 }, (_, i) => ({ 
      day: i + 1, 
      weekday: getWeekday(year.value, 0, i + 1) 
    }))},
    { name: "Feb", days: Array.from({ length: (year.value % 4 === 0 ? 29 : 28) }, (_, i) => ({ 
      day: i + 1, 
      weekday: getWeekday(year.value, 1, i + 1) 
    }))},
    { name: "Mar", days: Array.from({ length: 31 }, (_, i) => ({ 
      day: i + 1, 
      weekday: getWeekday(year.value, 2, i + 1) 
    }))},
    { name: "Apr", days: Array.from({ length: 30 }, (_, i) => ({ 
      day: i + 1, 
      weekday: getWeekday(year.value, 3, i + 1) 
    }))},
    { name: "May", days: Array.from({ length: 31 }, (_, i) => ({ 
      day: i + 1, 
      weekday: getWeekday(year.value, 4, i + 1) 
    }))},
    { name: "Jun", days: Array.from({ length: 30 }, (_, i) => ({ 
      day: i + 1, 
      weekday: getWeekday(year.value, 5, i + 1) 
    }))},
    { name: "Jul", days: Array.from({ length: 31 }, (_, i) => ({ 
      day: i + 1, 
      weekday: getWeekday(year.value, 6, i + 1) 
    }))},
    { name: "Aug", days: Array.from({ length: 31 }, (_, i) => ({ 
      day: i + 1, 
      weekday: getWeekday(year.value, 7, i + 1) 
    }))},
    { name: "Sep", days: Array.from({ length: 30 }, (_, i) => ({ 
      day: i + 1, 
      weekday: getWeekday(year.value, 8, i + 1) 
    }))},
    { name: "Oct", days: Array.from({ length: 31 }, (_, i) => ({ 
      day: i + 1, 
      weekday: getWeekday(year.value, 9, i + 1) 
    }))},
    { name: "Nov", days: Array.from({ length: 30 }, (_, i) => ({ 
      day: i + 1, 
      weekday: getWeekday(year.value, 10, i + 1) 
    }))},
    { name: "Dec", days: Array.from({ length: 31 }, (_, i) => ({ 
      day: i + 1, 
      weekday: getWeekday(year.value, 11, i + 1) 
    }))}
  ]);

  const sidebarVisible = ref(false);

  const toggleSidebar = () => {
      sidebarVisible.value = !sidebarVisible.value;
  };

  const editDay = (day, event) => {
    // isEditing.value = false;

    setTimeout(() => {
      activeCell.value = event.target;
      isEditing.value = true;
    }, 200);
    
    // alert(`编辑 ${month} ${day} 的日程`);
  };
  const saveNote = () => {
    // 保存笔记的逻辑
    isEditing.value = false;
    console.log(activeCell.value);
  }
</script>

<template>

  <div class="calendar-page">

    <!-- 侧边栏 -->
    <div class="sidebar" :class="{ 'sidebar-open': sidebarVisible }">
      <button class="toggle-button" @click="toggleSidebar">
        <span v-if="!sidebarVisible">
            <el-icon class="toggle-arrow"><ArrowRightBold /></el-icon>
        </span>
        <span v-else>
          <el-icon class="toggle-arrow"><ArrowLeftBold /></el-icon>
        </span>
      </button>
      
      <div class="user-profile">
        <img class="avatar" src="@/assets/default-avatar.png" alt="User Avatar" />
      </div>

      <div class="sidebar-content">
        <el-menu router :default-active="$route.path">
          <el-menu-item index="/" :route="'/'">Home</el-menu-item>
          <el-menu-item index="/archive" :route="'/archive'">Archive</el-menu-item>
          <el-menu-item index="/account" :route="'/account'">Account</el-menu-item>
          <el-menu-item index="/settings" :route="'/settings'">Settings</el-menu-item>
        </el-menu>
      </div>
    </div>

    <div class="year-header">
        <h1 class="year-text">{{ year }}</h1>
    </div>

    <div class="calendar-container">
      <div class="months-wrapper">
        <div v-for="month in months" :key="month.name" class="month-column">
          <div class="month-header">{{ month.name }}</div>
          <div v-for="day in month.days" :key="day.day" class="day-cell" @click="editDay(day.day, $event)">
            <div class="day-number">{{ day.day }}</div>
            <div class="weekday-text">{{ day.weekday }}</div>
          </div>
        </div>
      </div>

      <div>
        <el-popover 
        :visible="isEditing" 
        trigger="manual"
        :virtual-ref="activeCell" 
        virtual-triggering
        placement="bottom"
        width="200"
      >
        <div class="editor">
          <textarea v-model="note" placeholder="Write a note..." />
          <el-color-picker v-model="selectedColor"/>
          <el-button @click="saveNote">Save</el-button>
        </div>
      </el-popover>
    </div>
      
    </div>
  </div>

</template>

<style scoped>

.calendar-page {
  display: flex;
  position: relative;
}

/* 侧边栏样式 */
.sidebar {
  position: fixed;
  left: -180px; /* 默认隐藏 */
  top: 0;
  width: 180px;
  height: 100vh;
  transition: left 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.sidebar-open {
  left: 0;
}

/* 侧边栏展开按钮 */
.toggle-button {
  position: absolute;
  right: -27px;
  width: 30px;
  height: 20px;
  background-color: white;
  color: rgb(85, 85, 85);
  border: none;
  cursor: pointer;
  font-size: 18px;
  line-height: 60px;
  border-radius: 0 10px 10px 0;
}

.toggle-arrow {
  display: flex;
  transition: transform 0.2s ease-in-out;
}

.toggle-arrow:hover {
  display: flex;
  transform: scaleY(3) scaleX(1.3);
}

/* 侧边栏内容 */
.sidebar-content {
  flex-direction: column;
  justify-content: center;
  background-color: white;
}

.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* gap: 8px; */
  /* margin-bottom: 0px; 头像和菜单之间留空 */
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  /* border: 2px solid #ccc; */
}


.el-menu {
  border-right: none !important; /* 去掉菜单右侧的灰色线 */
  box-shadow: none !important; /* 去掉菜单的阴影 */
  justify-items: center;
}

.el-menu-item {
  font-size: 22px; /* 调整菜单文字大小 */;
  display: flex;
  border-radius: 10px;
  height: 40px;
  width: 150px;
  margin: 5px;
  justify-content: center; 
}

.el-menu-item.is-active {
  background-color: #e0e0e0 !important; /* 选中时和悬停一样 */
  color: inherit !important; /* 文字颜色不变 */
  font-weight: normal !important; /* 避免加粗 */
}

.el-menu-item:hover {
  background-color: #e0e0e0;
  /* transform: scale(1.1); */
  color: inherit;
  /* transition: transform 0.2s ease-in-out; */
}

.calendar-container {
  flex-grow: 1;
  max-width: 1050px;
  top: 160px;
  padding-top: 10px;
  max-height: calc(100vh - 160px); /* 减去year-header的高度 */
  overflow-y: auto; /* 让calendar-container本身可以滚动 */
  position: relative;
  /* background-color: #696767; */
  margin: auto;
}


.year-header {
  /* display: none; */
  width: 100%;
  top:0px;
  background-color: white;
  position: fixed;
  left: 221px;
  height: 140px;
  font-size: 48px;
  font-weight: bold;
  max-width: 70vw;
  /* padding-left: 10px; */
  z-index: 100;
}

.year-text {
  margin: 0;
  padding: 10px;
}

.months-wrapper {
  /* background-color: yellow; */
  display: flex;
  justify-content: space-between;
  max-width: 70vw;
  padding-bottom: 30px;
  margin: auto;
}

.month-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
}

.month-header {
  /* display: none; */
  background-color: white;
  width: 90px;
  height: 25px;
  text-align: center;
  position: fixed;
  top: 140px;
  font-weight: bold;
  font-size: 18px;
  padding-bottom: 2px;
  border-bottom:0.75px solid #8f8e8e;
  z-index: 99;
}

.day-cell {
  position: relative;
  width: 65px;
  height: 65px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  border: 1.5px solid #696767;
  margin-bottom: 10px;
  transition: 0.2s;
}

.day-cell:hover {
  background-color: #f0f0f0;
}



.day-number {
  font-size: 20px;
  /* font-weight: bold; */
}

.weekday-text {
  font-size: 14px;
  /* margin-top: 1px; */
  /* font-weight: bold; */
}

.editor {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

</style>