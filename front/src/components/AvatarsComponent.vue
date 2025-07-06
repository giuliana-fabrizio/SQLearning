<template>
    <div id="id_collapse_avatar" class="collapse mt-4">
        <div class="row g-3">
            <input id="id_avatar" type="hidden" name="avatar" value="">
            <div class="col-4 col-lg-2">
                <img id="id_avatar_bear" src="../../public/images/avatars/bear.png" class="img-avatar"
                    @click="changeAvatar('bear', 'id_avatar_bear')">
            </div>

            <div class="col-4 col-lg-2">
                <img id="id_avatar_bee" src="../../public/images/avatars/bee.png" class="img-avatar"
                    @click="changeAvatar('bee', 'id_avatar_bee')">
            </div>

            <div class="col-4 col-lg-2">
                <img id="id_avatar_cat" src="../../public/images/avatars/cat.png" class="img-avatar"
                    @click="changeAvatar('cat', 'id_avatar_cat')">
            </div>

            <div class="col-4 col-lg-2">
                <img id="id_avatar_cow" src="../../public/images/avatars/cow.png" class="img-avatar"
                    @click="changeAvatar('cow', 'id_avatar_cow')">
            </div>

            <div class="col-4 col-lg-2">
                <img id="id_avatar_dinosaur" src="../../public/images/avatars/dinosaur.png" class="img-avatar"
                    @click="changeAvatar('dinosaur', 'id_avatar_dinosaur')">
            </div>

            <div class="col-4 col-lg-2">
                <img id="id_avatar_elephant" src="../../public/images/avatars/elephant.png" class="img-avatar"
                    @click="changeAvatar('elephant', 'id_avatar_elephant')">
            </div>

            <div class="col-4 col-lg-2">
                <img id="id_avatar_ninja" src="../../public/images/avatars/ninja.png" class="img-avatar"
                    @click="changeAvatar('ninja', 'id_avatar_ninja')">
            </div>

            <div class="col-4 col-lg-2">
                <img id="id_avatar_rabbit" src="../../public/images/avatars/rabbit.png" class="img-avatar"
                    @click="changeAvatar('rabbit', 'id_avatar_rabbit')">
            </div>

            <div class="col-4 col-lg-2">
                <img id="id_avatar_vaquita" src="../../public/images/avatars/vaquita.png" class="img-avatar"
                    @click="changeAvatar('vaquita', 'id_avatar_vaquita')">
            </div>

            <div class="col-4 col-lg-2">
                <img src="../../public/images/avatars/delete.png" class="img-remove-avatar" @click="unselectAvatar()">
            </div>
        </div>
    </div>
</template>

<script>
import { purple } from "@/utils/colors";

export default {
    name: "AvatarsComponent",

    props: {
        avatar: String
    },

    mounted() {
        if (this.avatar) {
            this.changeAvatar(this.avatar, `id_avatar_${this.avatar}`);
        }
    },

    methods: {
        unselectAvatar() {
            const last_avatar = document.getElementsByClassName("img-avatar-selected");
            if (last_avatar.length == 1) {
                last_avatar[0].classList.remove("img-avatar-selected");
            }

            this.$emit('resetAvatar', null);
        },

        changeAvatar(avatar, id_selected) {
            this.unselectAvatar();
            document.getElementById(id_selected).style = `border-color: ${purple.color_8};`
            document.getElementById(id_selected).classList.add("img-avatar-selected");

            this.$emit('resetAvatar', avatar);
        }
    }
}
</script>