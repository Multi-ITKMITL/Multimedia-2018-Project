local_save = JSON.parse(localStorage.boring_data);
function loadStory(){
story = {
    1: {
        cond: "Brink of extinction",
        desc: "There is no power left on earth. Humanity is on the brink of extinction.",
        task: "Use the generator to manually generate the power",
        req_b: local_save.stats.total_pwr,
        req_a: 50
    },
    2: {
        cond: "Brink of extinction",
        desc: "Great, the generator is working! But we need a sustained source of power.",
        task: "Build 3 biofuel plant",
        req_b: local_save.buildings["1_biof"],
        req_a: 3
    },
    3: {
        cond: "A New Hope",
        desc: "The base of operations established but we need more power to keep it running.",
        task: "Collect 5000 MWs of power",
        req_b: local_save.stats.total_pwr,
        req_a: 5000
    },
    4: {
        cond: "A New Hope",
        desc: "The coal power plant is polluting our air! We need to change the fuel type",
        task: "Upgrade to Natural Gas Station",
        req_b: local_save.upgrades["coal2"],
        req_a: 1
    },
    5: {
        cond: "A New Hope",
        desc: "The damage assessment tells us that we need to surplus our production.",
        task: "Maintain speed at 150 MW/s",
        req_b: "getRateAll()",
        req_a: 150
    },
    6: {
        cond: "A New Hope",
        desc: "At this rate, our country will recover soon!",
        task: "Collect 100000 MWs of power",
        req_b: local_save.stats.total_pwr,
        req_a: 100000
    },
    7: {
        cond: "Return of Humanity",
        desc: "You powered the entire country! To assess global damage we need to launch a satellite.",
        task: "Launch a Satellite",
        req_b: local_save.upgrades["sat"],
        req_a: 1
    },
    8: {
        cond: "Return of Humanity",
        desc: "Global damage is worse than we think. Time to surplus our production again.",
        task: "Collect 15000000 MWs of power",
        req_b: local_save.stats.total_pwr,
        req_a: 15000000
    },
    9: {
        cond: "Return of Humanity",
        desc: "Time to distribute the power to our neighbor ",
        task: "Start distribution",
        req_b: local_save.upgrades["dstb"],
        req_a: 1
    },
    10: {
        cond: "Return of Humanity",
        desc: "It will take a while to distribute the power. Let's collect some more power to move on with the global effort!",
        task: "Collect 100000000 MWs of power",
        req_b: local_save.stats.total_pwr,
        req_a: 100000000
    },
    11: {
        cond: "Nature Strikes Back",
        desc: "An earthquake has damaged the other stations and beyond repair. We are the sole station left this is our one last chance to save the world!",
        task: "Collect 30000000 MWs of power",
        req_b: local_save.stats.total_pwr,
        req_a: 300000000
    },
    12: {
        cond: "Humanity is Grateful!",
        desc: "You saved the world! Now there's enough power to help us rebuild the society",
        task: "Planet earth is blue and there's nothing left to do",
        req_b: -1,
        req_a: 0
    },
}
}
