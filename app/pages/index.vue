<script lang="ts" setup>
import { useQuery } from "@tanstack/vue-query";

const { data } = useQuery(
  useOrpc().hello.queryOptions({ input: { name: "World" } })
);
</script>

<template>
  <div>
    <h1>Message: {{ data?.message }}</h1>
  </div>
</template>
