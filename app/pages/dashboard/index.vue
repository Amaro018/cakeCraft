<script setup lang="ts">
import { authClient } from '~~/server/lib/auth-client';

useHead({
  title: 'Cake Craft Dashboard',
});

definePageMeta({
  middleware: ['auth'],
});

const session = authClient.useSession();
async function signOut() {
  await authClient.signOut();
  await navigateTo('/auth/login');
}
</script>

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
      <div class="navbar bg-base-100 shadow-md px-4">
        <div class="flex-none lg:hidden">
          <label for="my-drawer" class="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
        </div>
        <div class="flex-1">
          <a class="text-xl font-bold">{{ session?.data?.user.name }}</a>
        </div>
        <div class="flex-none">
          <button class="btn btn-ghost btn-circle">
            <div class="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405M19 13a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>

      <!-- Page Content -->
      <main class="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Stat Cards -->
        <div class="stat bg-base-100 shadow-md rounded-xl p-4">
          <div class="stat-title">
            Orders Today
          </div>
          <div class="stat-value">
            128
          </div>
          <div class="stat-desc">
            ↗︎ 12% from yesterday
          </div>
        </div>

        <div class="stat bg-base-100 shadow-md rounded-xl p-4">
          <div class="stat-title">
            Total Revenue
          </div>
          <div class="stat-value">
            ₱45,200
          </div>
          <div class="stat-desc">
            ↗︎ Growing steady
          </div>
        </div>

        <div class="stat bg-base-100 shadow-md rounded-xl p-4">
          <div class="stat-title">
            New Customers
          </div>
          <div class="stat-value">
            42
          </div>
          <div class="stat-desc">
            ↘︎ Slightly down
          </div>
        </div>

        <!-- Table of Recent Orders -->
        <div class="col-span-1 md:col-span-2 lg:col-span-3 bg-base-100 shadow-md rounded-xl p-4">
          <h2 class="text-lg font-bold mb-4">
            Recent Orders
          </h2>
          <div class="overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Item</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#1001</td>
                  <td>Ana Santos</td>
                  <td>Chocolate Cake</td>
                  <td><span class="badge badge-success">Completed</span></td>
                  <td>₱1,200</td>
                </tr>
                <tr>
                  <td>#1002</td>
                  <td>Juan Dela Cruz</td>
                  <td>Red Velvet</td>
                  <td><span class="badge badge-warning">Pending</span></td>
                  <td>₱980</td>
                </tr>
                <tr>
                  <td>#1003</td>
                  <td>Maria Clara</td>
                  <td>Cupcake Set</td>
                  <td><span class="badge badge-error">Cancelled</span></td>
                  <td>₱500</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>

    <!-- Sidebar Drawer -->
    <div class="drawer-side">
      <label for="my-drawer" class="drawer-overlay" />
      <aside class="menu p-4 w-64 bg-base-200 min-h-full">
        <div class="flex flex-row items-center my-6">
          <Icon name="game-icons:chef-toque" size="3em" />
          <h2 class="text-xl font-bold">
            CakeCraft
          </h2>
        </div>
        <ul class="menu">
          <li><a class="active">Dashboard</a></li>
          <li><a>Cakes</a></li>
          <li>
            <button @click="signOut">
              Logout
            </button>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>
