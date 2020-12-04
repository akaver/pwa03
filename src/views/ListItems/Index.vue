<template>
    <h1>Index - ListItems</h1>

    <p>
        <router-link to="/listitems/create">Create New</router-link>
    </p>
    <table class="table">
        <thead>
            <tr>
                <th>Description</th>
                <th>Completed</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="listItem in listItems" v-bind:key="listItem.id">
                <td>{{ listItem.description }}</td>
                <td>
                    <input
                        class="check-box"
                        disabled="disabled"
                        type="checkbox"
                        v-model="listItem.completed"
                    />
                </td>
                <td>
                    <router-link
                        :to="{
                            name: 'listitemsEdit',
                            params: { id: listItem.id },
                        }"
                        >Edit</router-link
                    >
                    |
                    <a href="#" v-on:click.prevent="deleteClicked(listItem.id)"
                        >Delete</a
                    >
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { IListItem } from "@/domain/list-item";
import { Options, Vue } from "vue-class-component";
import { apiKey } from "@/config";
import { deleteListItem, getListItems } from "@/api/list-rest-api";

const TAG = "ListItemsIndex";

@Options({
    components: {},
})
export default class ListItemsIndex extends Vue {
    listItems: IListItem[] = [];

    async deleteClicked(id: number) {
        console.log(TAG, "deleteClicked", id);
        const responseCode = await deleteListItem(id, apiKey);
        console.log(TAG, "deleteClicked responseCode", responseCode);
        await this.loadData();
    }

    async loadData() {
        this.listItems = (await getListItems(apiKey)) ?? [];
        console.log(TAG, this.listItems);
    }

    async beforeMount() {
        console.log(TAG, "beforeMount");
        // load your data from rest api here!
        await this.loadData();
    }

    mounted() {
        console.log(TAG, "mounted");
    }

    beforeUpdate() {
        console.log(TAG, "beforeUpdate");
    }

    updated() {
        console.log(TAG, "updated");
    }

    beforeUnmount() {
        console.log(TAG, "beforeUnmount");
    }

    unmounted() {
        console.log(TAG, "unmounted");
    }

    activated() {
        console.log(TAG, "activated");
    }

    deactivated() {
        console.log(TAG, "deactivated");
    }

    // use setup() in composition api
    beforeCreate() {
        console.log(TAG, "beforeCreate");
    }
}
</script>
