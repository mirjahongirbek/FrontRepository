<template>
    <div>
        <v-server-table
                ref="serverTable"
                :columns="columns"
                :options="options"
                :urls="url"
                :serviceName="serviceName"
        >
            <div v-for="key in changeSlots" :slot="key.name" slot-scope="props">
                <j-input :options="key.options" :id="props.row[props.column]" @getEvent="getEvent"></j-input>
            </div>
        </v-server-table>
    </div>
</template>
<script src="./serverTable.js"></script>