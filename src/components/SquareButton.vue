<script setup></script>

<style>
.my-button {
  --p: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  fill: var(--off-white);
  color: var(--off-white);
  padding: 0.5rem 0.75rem;
  background: linear-gradient(var(--secondary) 0 0) calc(100% - var(--p, 0%)) /
    var(--p, 0%) no-repeat;
  transition: 0.4s, background-position 0s;
  outline: none;
}

.my-button:hover {
  --p: 0%;
  border: 1px solid var(--secondary);
  color: var(--secondary);
  fill: var(--secondary);
}
</style>

<template>
  <button class="my-button py-3">
    <slot />
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14">
      <path
        d="M0 7.42c0 .401.32.708.736.708h11.956l-4.124 4.626a.685.685 0 0 0 .074.991c.319.26.785.213 1.03-.07l5.156-5.783A.704.704 0 0 0 15 7.42a.71.71 0 0 0-.172-.472L9.673 1.165a.734.734 0 0 0-1.031-.07.667.667 0 0 0-.074.99l4.124 4.627H.736C.32 6.712 0 7.019 0 7.42z"
        fill-rule="nonzero"
      />
    </svg>
  </button>
</template>
