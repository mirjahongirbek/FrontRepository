<template>
    <div>
        <div class="row">
            <div class="col-lg-12">
                <div class="form-group row">
                    <label class="col-md-4 col-form-label text-right">Маска номер карты</label>
                    <div class="col-md-8">
                        <input type="text" v-model="temp.userName" class="form-control"/>
                    </div>
                </div>

                <div class="form-group row">
                    <label class="col-md-4 col-form-label text-right">Наименование</label>
                    <div class="col-md-8">
                        <input type="password" v-model="temp.password" class="form-control"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-end">
            <button  class="btn base_btn" @click="login()" >Добавить</button>
        </div>
    </div>
</template>
<script src="./login.js"></script>
