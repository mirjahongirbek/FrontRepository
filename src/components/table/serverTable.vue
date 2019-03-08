<template>
    <div>
        <v-server-table
                ref="serverTable"
                :columns="columns"
                :options="options"
                :urls="url"

                :serviceName="serviceName"

        >

        </v-server-table>
    </div>
</template>
<script src="./serverTable.js"></script>