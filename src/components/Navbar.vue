<script setup lang="ts"></script>

<template>
    <nav class="p-5 text-l sticky top-0 flex items-center justify-between z-50">
        <div class="flex items-center space-x-4 absolute">
            <img src="/src/assets/vue.svg" alt="logo" class="w-8 h-8" />
            <span>My Website</span>
        </div>
        <div class="flex flex-row justify-between w-[25%] mx-auto">
            <a
                class="hover:text-primary-lighter transition duration-75"
                href="#home"
                >Home</a
            >
            <a
                class="hover:text-primary-lighter transition duration-75"
                href="#about"
                >About</a
            >
            <a
                class="hover:text-primary-lighter transition duration-75"
                href="#projects"
                >Projects</a
            >
            <a
                class="hover:text-primary-lighter transition duration-75"
                href="#contact"
                >Contact</a
            >
        </div>
    </nav>
</template>

<style scoped>
@keyframes slide-down {
    from {
        transform: translateY(-50px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.animate-slide-down {
    animation: slide-down 1s ease-in-out;
}
</style>
