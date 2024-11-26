<script setup>
import { computed } from "vue";
import { date } from "quasar";
import { useNotesStore } from "../stores/notes";

const notesStore = useNotesStore();

const searchResult = computed(() => {
    return notesStore.notes.filter((note) => {
        return (
            note.title
                .toLowerCase()
                .indexOf(notesStore.searchQuery.toLowerCase()) != -1 ||
            note.content
                .toLowerCase()
                .indexOf(notesStore.searchQuery.toLowerCase()) != -1
        );
    });
});
</script>

<template>
    <q-page class="flex">
        <q-separator />

        <div
            v-if="notesStore.notes.length > 0"
            style="
                height: 100%;
                width: 100%;
                align-items: center;
                row-gap: 8px;
                column-gap: 6px;
                flex-wrap: wrap;
                justify-content: flex-start;
            "
            class="flex"
        >
            <q-card
                v-for="note in searchResult"
                :key="note.id"
                class="note-card q-mt-md"
                style="width: 24%"
                flat
                bordered
            >
                <q-card-section>
                    <div class="row items-center no-wrap">
                        <div class="col">
                            <div class="text-h6">{{ note.title }}</div>
                            <div class="text-subtitle2">
                                {{
                                    date.formatDate(
                                        note.dateAdded,
                                        "DD MMMM YYYY"
                                    )
                                }}
                                <q-badge
                                    clickable
                                    rounded
                                    color="primary"
                                    class="q-mx-xs"
                                    v-for="tag in note.tags"
                                >
                                    <q-breadcrumbs-el
                                        :label="tag.name"
                                        :to="{
                                            name: 'tag-detail',
                                            params: { id: tag.id },
                                        }"
                                    />
                                </q-badge>
                            </div>
                        </div>

                        <div class="col-auto">
                            <q-btn color="grey-7" round flat icon="more_vert">
                                <q-menu cover auto-close>
                                    <q-list>
                                        <q-item clickable>
                                            <q-item-section color="negative"
                                                >Xóa</q-item-section
                                            >
                                        </q-item>
                                    </q-list>
                                </q-menu>
                            </q-btn>
                        </div>
                    </div>
                </q-card-section>

                <q-separator dark inset />

                <q-card-section horizontal>
                    <q-card-section>
                        {{ note.content.substring(0, 200) }}
                    </q-card-section>
                </q-card-section>

                <q-separator />

                <q-card-actions>
                    <q-btn
                        color="info"
                        flat
                        :to="{ name: 'note-detail', params: { id: note.id } }"
                        >Tùy chỉnh</q-btn
                    >
                </q-card-actions>
            </q-card>
        </div>
        <div v-else>
            <p>Nhấp (+) để tạo ghi chú</p>
        </div>

        <!-- <div v-if="searchResult.length == 0">
      <p>No Notes Found with the provided title or content, Please try another search query.</p>
    </div> -->

        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="add" color="primary" :to="{ name: 'add-note' }">
            </q-btn>
        </q-page-sticky>
    </q-page>
</template>

<style lang="sass" scoped>
.search-input
  width: 100%
  max-width: 300px

.note-card
  width: 350px
</style>
