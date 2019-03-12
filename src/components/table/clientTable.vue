<template>
<div>
    <v-client-table :data="tablesData" :columns="columns" :options="options">
        <div v-for="key in changeSlots" :slot="key.name" slot-scope="props">
            <j-input :options="key.options" :id="props.row[props.column]" @getEvent="getEvent"></j-input>
        </div>
    </v-client-table>
</div>
</template>
<script src="./clientTable.js"></script>