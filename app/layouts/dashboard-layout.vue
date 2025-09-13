<template>
  <div class="drawer lg:drawer-open">
    <!-- Sidebar -->
    <input
      id="my-drawer"
      type="checkbox"
      class="drawer-toggle"
    >
    <div class="drawer-content flex flex-col">
      <!-- Navbar -->
      <AppDashboardNavbar />

      <!-- Page Content -->
      <main class="w-full p-2 flex flex-col">
        <slot />
      </main>
    </div>
    <AppSidebarDrawer />
  </div>
</template>
