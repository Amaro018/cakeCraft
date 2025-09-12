<script setup lang="ts">
useHead({
  title: 'Cake Craft Dashboard',
});

definePageMeta({
  middleware: ['auth'],
  layout: 'dashboard-layout',
});
</script>

<template>
  <!-- Page Content -->
  <div class="w-full">
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
</template>
