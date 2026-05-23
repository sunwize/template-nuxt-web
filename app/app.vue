<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";

const { data: ping } = useQuery(
  useOrpc().hello.queryOptions({
    input: { name: "world" },
  })
);
</script>

<template>
  <div>{{ ping?.message }}</div>
</template>
