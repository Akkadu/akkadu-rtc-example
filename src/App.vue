<template>
  <div class="p-10">
    <h1>Hello App!</h1>
    <p class="my-10">
      <!-- use the router-link component for navigation. -->
      <!-- specify the link by passing the `to` prop. -->
      <!-- `<router-link>` will render an `<a>` tag with the correct `href` attribute -->
      <!-- <router-link class="mr-3 bg-blue-50 font-bold rounded-md px-4 py-3 text-blue-600" to="/receiver">Receiver</router-link>
      <router-link class="mr-3 bg-blue-50 font-bold rounded-md px-4 py-3 text-blue-600" to="/interpreter1">Interpreter1</router-link>
      <router-link class="mr-3 bg-blue-50 font-bold rounded-md px-4 py-3 text-blue-600" to="/interpreter2">Interpreter2</router-link> -->
    </p>
    <!-- route outlet -->
    <!-- component matched by the route will render here -->
    <router-view></router-view>
  </div>
</template>
