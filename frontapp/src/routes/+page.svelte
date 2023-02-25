<script>
    // Super simple quick and dirty CRUD Table. Svelte shines as always.
    // https://twitter.com/kevmodrome for more juicy actions and tips

    let columns = ["Name", "Email", "Phone Number", "Action"];
    let data = [
        ["John", "john@example.com", "(353) 01 222 3333"],
        ["Mark", "mark@gmail.com", "(01) 22 888 4444"],
        ["Eoin", "eoin@gmail.com", "0097 22 654 00033"],
        ["Sarah", "sarahcdd@gmail.com", "+322 876 1233"],
        ["Afshin", "afshin@mail.com", "(353) 22 87 8356"],
    ];
    let newRow = [...columns];

    function addRow() {
        data = [...data, [...newRow]];
        newRow = columns;
    }

    function deleteRow(rowToBeDeleted) {
        data = data.filter((row) => row != rowToBeDeleted);
    }
</script>

<table class="table-auto border-collapse border border-slate-300">
    <thead class="bg-indigo-400 text-white">
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

        <tr class="new">
            {#each newRow as column}
                <td contenteditable="true" bind:innerHTML={column} />
            {/each}
            <button on:click={addRow}> add </button>
        </tr>
    </tbody>
</table>

<style lang="postcss">
    .new {
        color: grey;
    }
    .new td:focus {
        color: black;
    }
    :global(html) {
        background-color: theme(colors.gray.100);
    }
</style>
