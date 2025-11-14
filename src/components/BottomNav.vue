<template>
  <div class="bottom-nav">
    <div class="nav-item active">
      <span class="icon">
        <!-- Home icon -->
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#1976d2">
          <path d="M12 3l10 9h-3v9h-6v-6h-2v6H5v-9H2z" />
        </svg>
      </span>
      <div>Trang chủ</div>
    </div>
    <div class="nav-item">
      <span class="icon zalo-icon">
        <!-- Zalo icon -->
        <svg width="40" height="40" viewBox="0 0 48 48" fill="#1976d2">
          <ellipse cx="24" cy="24" rx="22" ry="18" fill="#fff" />
          <text x="13" y="29" font-size="12" font-family="Arial" fill="#1976d2">
            Zalo
          </text>
        </svg>
      </span>
      <div>Liên hệ</div>
    </div>
    <div class="nav-item">
      <span class="icon">
        <!-- Order icon -->
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#1976d2">
          <path
            d="M3 6v18h18V6H3zm16 16H5V8h14v14zm-2-8H7v-2h10v2zm0 4H7v-2h10v2z"
          />
        </svg>
      </span>
      <div>Đơn hàng</div>
    </div>
    <div class="nav-item">
      <span class="icon">
        <!-- Account icon -->
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#1976d2">
          <circle cx="12" cy="8" r="4" />
          <path d="M12 14c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4z" />
        </svg>
      </span>
      <div>Tài khoản</div>
    </div>
  </div>
</template>

<style>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #ddd;
  z-index: 10;
}
.nav-item {
  font-size: 14px;
  color: gray;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.nav-item .icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2px;
}
.zalo-icon svg {
  width: 40px !important;
  height: 40px !important;
}
.nav-item.active {
  color: #1976d2;
  font-weight: bold;
}
.nav-item.active .icon svg,
.nav-item .icon svg {
  fill: #1976d2;
}
</style>
