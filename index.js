function print(path, layer) {

    // If we arrived at that layer that has key route then split the path than concat it with path and call the next print to get into the level of method
    if (layer.route) {
        layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
    } 
    
    // If we arrived at that layer that has property name and its value is route that means it has more route layer inside layer.handle.stack
    // And in that type of layer it does not have route but it has regexp tha has route path so split it using regexp and concat it with path
    else if (layer.name === 'router' && layer.handle.stack) {
        layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
    } 
    
    // In this layer if layer is having a key method than print it and if 
    else if (layer.method) {
        console.log('|%s\t | /%s\t',
            layer.method.toUpperCase(),
            path.concat(split(layer.regexp)).filter(Boolean).join('/'))
        console.log('----------------------------------------');
    }
}

function split(thing) {

    // If type of route is string than split them with / and make array
    if (typeof thing === 'string') {
        return thing.split('/');

    }

    // It is specifically for catch_all routes * type route that will catch all the routes
    else if (thing.fast_slash) {
        return ''
    }
    
    // Here thing will update using regex
    else {
        var match = thing.toString()
            .replace('\\/?', '')
            .replace('(?=\\/|$)', '$')
            .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
        return match
            ? match[1].replace(/\\(.)/g, '$1').split('/')
            : '<complex:' + thing.toString() + '>'
    }

}

function getRoutesList(app) {
    const stack = app._router.stack;
    const path = [];
    console.log('----------------------------------------');
    stack.forEach(layer => {
        print(path, layer);
    });
}

module.exports = {
    getRoutesList
};