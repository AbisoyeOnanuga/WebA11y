const app = vue.createapp({
    // Define data and methods here
    data() {
        return {
            // For example, an array of records
            records: []
        }
    },
    methods: {
        // For example, a method to fetch records from the backend
        async fetchRecords() {
            // Use axios to make a GET request to /records
            const response = await axios.get("/records");
            // Assign the response data to the records array
            this.records = response.data;
        }
    },
    // You can also do lifecycle hooks to run some code when the app is created or mounted
    created() {
        // For example, you can fetch records when the app is created
        this.fetchRecords();
    }
});

// Mount the app to the container element
app.mount("#app");