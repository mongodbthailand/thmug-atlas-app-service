<script>
    import { onMount } from "svelte";
    import { dialogs } from "svelte-dialogs";
    
    const url = "https://ap-southeast-1.aws.data.mongodb-api.com/app/data-codth/endpoint";

    let columns = ["id", "who", "what", "when"];
    /**
     * @type {any[]}
     */
    let data = [];
    let newRow = [...columns];
    let who = '';
    let what = '';

    onMount(async () => {
        loadRows();
    });

    function loadRows(){
        fetch(
            url + "/getallchats?secret=b8b772d5-d7dd-4b9e-ac7b-daddcb58f426"
        )
        .then((response) => response.json())
        .then((d) => {
            d['result'].forEach((/** @type {{ [x: string]: any; }} */ element) => {
                data = [...data, [element['_id'], element['who'], element['what'], element['when']]];
            });
            console.log(d);
        })
        .catch((error) => {
            console.log(error);
            return [];
        });
    }

    function addRow() {
        fetch(
            url + "/addchat?secret=b8b772d5-d7dd-4b9e-ac7b-daddcb58f426", { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"who": who, "what": what})
            }
        )
        .then((response) => response.json())
        .then((d) => {            
            data = [];
            loadRows();
            console.log(d);
        })
        .catch((error) => {
            console.log(error);
            return [];
        });
    }

    /**
     * @param {any} rowToBeDeleted
     */
    async function deleteRow(rowToBeDeleted) {
        if(await dialogs.confirm("Are you sure to delete?") == true){
            const _id = rowToBeDeleted[0];
            console.log(_id);
            fetch(
                url + "/deletechat?secret=b8b772d5-d7dd-4b9e-ac7b-daddcb58f426", { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({"chatId": _id})
                }
            )
            .then((response) => response.json())
            .then((d) => {            
                data = data.filter((row) => row != rowToBeDeleted);   
                console.log(d);
            })
            .catch((error) => {
                console.log(error);
                return [];
            });
        }            
    }
</script>

<table class="table-auto border-separate border-spacing-1 border-collapse border border-slate-300 border-spacing-px">
    <thead class="bg-indigo-400 text-white border-spacing-px">
        {#each columns as column}
            <th>{column}</th>
        {/each}
    </thead>

    <tbody>
        {#each data as row}
            <tr class="even:bg-amber-100 odd:bg-blue-100">
                {#each row as cell}
                    <td contenteditable="true" bind:innerHTML={cell} />
                {/each}
                <button on:click={() => deleteRow(row)}> X </button>
            </tr>
        {/each}        
    </tbody>
</table>
<table>    
    <tbody>
        <tr>
            <th>Who:</th>
            <td><input type="text" bind:value={who} /></td>
        </tr>
        <tr>
            <th>What:</th>
            <td><input type="text" bind:value={what} /></td>
        </tr>
    </tbody>
    <button on:click={addRow}> add </button>
</table>

<style lang="postcss">
    .new {
        color: grey;
    }
    .new td:focus {
        color: black;
        background-color: aquamarine;
    }
    :global(html) {
        background-color: theme(colors.gray.100);
    }
</style>


<!-- curl \
-H "Content-Type: application/json" \
-d '{"chatId":"63ff71e468cd38bf929bfd2c"}' \
https://ap-southeast-1.aws.data.mongodb-api.com/app/data-codth/endpoint/deletechat?secret=b8b772d5-d7dd-4b9e-ac7b-daddcb58f426 -->

