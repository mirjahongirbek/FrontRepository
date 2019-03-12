<template>
    <div>
        <b-card title="Card title" sub-title="Card subtitle">
            <b-card-text>
                Add Aytim
            </b-card-text>
           <div v-for="(key, value) in getDatalist" :key="value">
               {{modals[key.name]}}
               <j-input :type="key.type" :startValue="modals[key.name]"></j-input>
            </div>
        </b-card>
    </div>
</template>

<script src="./edit.js"></script>

<style scoped>

</style>