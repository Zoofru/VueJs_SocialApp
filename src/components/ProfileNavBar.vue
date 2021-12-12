<script>
export default {
    name: "ProfileNavBar",
    data() {
        return {
            navItems: ['Sparks', 'Liked Posts', 'Posts', 'Top Posts'],
        }
    }, methods: {
        handleTabClicked(index) {
            //Handle which tab is focused
            const cssSelector = `#nav-buttons-${index}`
            let btns = document.querySelectorAll('.button')
            for (let btn of btns) {
                btn.classList.remove('clicked')
            }

            document.querySelector(cssSelector).classList.add('clicked')
            this.$emit('tab', document.querySelector(cssSelector).textContent)
        }
    },
}
</script>

<template>
    <div id='root'>
        <div id='bar' v-for="(item, index) in this.navItems" :key=index>
            <button :id="[`nav-buttons-${index}`]" class='button clicked' v-if="item == 'Sparks'" @click="this.handleTabClicked(index)">{{item}}</button>
            <button :id="[`nav-buttons-${index}`]" class='button' v-else @click="this.handleTabClicked(index)">{{item}}</button>
        </div>
    </div>
</template>

<style scoped>
button {
    width: 95%;
    border: 2px solid var(--main-color-blue);
    background-color: var(--main-color-blue);
    color: white;
}

button:hover {
    cursor: pointer;
    background-color: white;
    color: var(--main-color-blue);
}

#root {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 5%;
    width: 90%;
}

#bar {
    width: 40%;
    display: flex;
    justify-content: center;
}

.clicked {
    cursor: pointer;
    background-color: white;
    color: var(--main-color-blue);
}
</style>