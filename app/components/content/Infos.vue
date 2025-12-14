<template>
  <article class="inline-flex justify-around gap-8 w-full items-center mt-10">
    <div class="text-lg">
      Price
      <p class="text-xl font-semibold">
        <slot name="price" />
      </p>
    </div>
    <div class="text-lg ">
      Duration
      <p class="text-xl font-semibold">
        <slot name="duration" />
      </p>
    </div>
    <div class="text-lg">
      Stack
      <p class="text-xl font-semibold">
        <slot name="technos" />
      </p>
    </div>
  </article>
</template>