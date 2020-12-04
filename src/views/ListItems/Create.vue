<template>
    <h1>ListItem - Create</h1>
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
                    v-model="description"
                />
            </div>
            <div class="form-group form-check">
                <label class="form-check-label">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        v-model="completed"
                    />
                    Completed
                </label>
            </div>
            <div class="form-group">
                <button
                    class="btn btn-primary"
                    v-on:click.prevent="createClicked"
                >
                    Create
                </button>
            </div>
        </div>
    </div>

    <div>
        <a href="/ListItems">Back to List</a>
    </div>
</template>

<script lang="ts">
import { postListItem } from "@/api/list-rest-api";
import { apiKey } from "@/config";
import { IListItemBase } from "@/domain/list-item";
import { Options, Vue } from "vue-class-component";

const TAG = "ListItemsCreate";

@Options({
    components: {},
})
export default class ListItemsCreate extends Vue {
    description = "";
    completed = false;

    async createClicked() {
        console.log(TAG, "createClicked", this.description, this.completed);
        const listItem: IListItemBase = {
            description: this.description,
            completed: this.completed,
        };

        const result = await postListItem(listItem, apiKey);

        this.$router.push('/listitems');
    }
}
</script>
