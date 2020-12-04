<template>
    <h1>ListItem - Edit</h1>

    <hr />
    <div class="row">
        <div class="col-md-4">
            <div class="form-group">
                <label class="control-label" for="Description"
                    >Description</label
                >
                <input
                    class="form-control"
                    type="text"
                    maxlength="255"
                    v-model="listItem.description"
                />
            </div>
            <div class="form-group form-check">
                <label class="form-check-label">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        checked="checked"
                        v-model="listItem.completed"
                    />
                    Completed
                </label>
            </div>

            <div class="form-group">
                <button class="btn btn-primary" @click.prevent="saveClicked">
                    Save
                </button>
            </div>
        </div>
    </div>

    <div>
        <a href="/ListItems">Back to List</a>
    </div>
</template>

<script lang="ts">
import { getListItem, putListItem } from "@/api/list-rest-api";
import { apiKey } from "@/config";
import { IListItem } from "@/domain/list-item";
import { Options, Vue } from "vue-class-component";

const TAG = "ListItemsEdit";

@Options({
    components: {},
})
export default class ListItemsEdit extends Vue {
    async saveClicked() {
        const response = await putListItem(this.listItem, apiKey);
        console.log(TAG, "saveClicked response", this.listItem);
        this.$router.push("/listitems");
    }

    listItem: IListItem = {
        id: 0,
        description: "",
        completed: false,
    };

    async loadData() {
        this.listItem = (await getListItem(
            Number(this.$route.params.id),
            apiKey
        )) ?? {
            id: 0,
            description: "",
            completed: false,
        };
        console.log(TAG, this.listItem);
    }

    async beforeMount() {
        console.log(TAG, "beforeMount");
        // load your data from rest api here!
        await this.loadData();
    }
}
</script>
