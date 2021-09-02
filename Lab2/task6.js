function debug(fn) {
    return (...arguments) => {
        console.log('Execution started');
        try {
            result = fn(...arguments)
        }
        catch (e) {
            console.log("Error occurred");
        }
        finally {
            console.log('Execution finished');
        }

        return result
    }
}

function output() {
    console.log(500);
}


debug(output)();