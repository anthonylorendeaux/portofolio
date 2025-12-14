<script setup lang="ts">
definePageMeta({
    title: 'About me',
    description: 'Why choose me and my stack',
    keywords: 'stack, about',
})
</script>

<template>
    <UContainer>
        <h2 class="text-xl sm:text-3xl font-bold text-left"> About me. </h2>
        <section class="mt-4 sm:mt-10">
            <p>
                I am a full-stack web developer with experience in building web applications that integrate both
                frontend and backend technologies. One of my key projects involved creating a full-stack
                application with <strong>Strapi</strong> as the CMS. I specialize in solving complex content
                management problems by utilizing modern tools and frameworks like <strong>Nuxt.js</strong>,
                <strong>Tailwind CSS</strong>, and <strong>Node.js</strong>, all while ensuring the backend is
                optimized for scalability and performance.
            </p>
            <p>
                With experience working both in teams and as a solo freelancer, I’ve had the opportunity to
                collaborate across various industries, including tech, restaurant, and local businesses. I
                thrive on delivering results that not only meet client requirements but also enhance user
                engagement and conversion rates. My work is always driven by the goal of optimizing user
                experience and leveraging the latest tools such as <strong>SEO plugins</strong> and
                <strong>content management systems</strong> to ensure that websites are both functional and
                discoverable.
            </p>
            <p>
                In addition to my hands-on development experience, I use <strong>GitLab</strong>, <strong>GitHub
                    Actions</strong>, to manage projects and ensure smooth development. I’m particularly
                interested in further improving <strong>Three.js</strong> visualizations to create more
                interactive, high-conversion applications.
            </p>
            <p>
                With an <strong>engineering degree</strong> and <strong>Microsoft certification</strong>, I have
                a strong technical foundation that allows me to approach problems from multiple disciplines,
                adapting to new challenges and continuing to grow in both backend and frontend development.
            </p>
            <p>
                I’m passionate about leveraging my skills to help businesses improve their online presence and
                solve real-world problems through innovative web applications.
            </p>
        </section>

        <div class="my-8">
            <h3 class="md: text-xl font-bold mb-2">My Tech Stack</h3>
            <ul class="list-disc pl-6">
                <li><strong>Frontend:</strong> Nuxt.js, Tailwind CSS, Three.js</li>
                <li><strong>Backend:</strong> Node.js, Strapi</li>
                <li><strong>Version Control and CI/CD:</strong> GitLab, GitHub Actions</li>
                <li><strong>Project Management:</strong> Jira</li>
                <li><strong>Others:</strong> SEO, Content Management Systems</li>
            </ul>
        </div>
    </UContainer>
</template>