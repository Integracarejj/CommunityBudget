
export type CommunityEntry = {
    name: string;
    initials: string;
    agm: string;
    futureAGM?: string;
    analyst: string;
};

export const communities: CommunityEntry[] = [
    { name: "Abington", initials: "AMH", agm: "Parween", futureAGM: "Parween", analyst: "Kotouch" },
    { name: "Bedford", initials: "CCB", agm: "Olson", futureAGM: "Olson", analyst: "LeMarie" },
    { name: "Candle Light Cove", initials: "EAS", agm: "Stewart", futureAGM: "Stewart", analyst: "Kotouch" },
    { name: "Chambersburg", initials: "CHB", agm: "Olson", futureAGM: "Olson", analyst: "Ritter" },
    { name: "Chestnut Ridge", initials: "CNR", agm: "Fusaro", futureAGM: "Fusaro", analyst: "Kotouch" },
    { name: "Clearfield", initials: "CCC", agm: "Coulter", futureAGM: "Coulter", analyst: "LeMarie" },
    { name: "Clearview", initials: "CV", agm: "Renwick", futureAGM: "Renwick", analyst: "Battin" },
    { name: "Erie", initials: "RPI", agm: "Renwick", futureAGM: "Renwick", analyst: "LeMarie" },
    { name: "Exton", initials: "EXT", agm: "Fusaro", futureAGM: "Fusaro", analyst: "Tubridy" },
    { name: "Glen Mills", initials: "GML", agm: "Fusaro", futureAGM: "Fusaro", analyst: "Talak" },
    { name: "Great Falls", initials: "RCR", agm: "Stewart", futureAGM: "Stewart", analyst: "Ritter" },
    { name: "Home Office", initials: "ICC", agm: "", analyst: "Battin" },
    { name: "Lancaster", initials: "LC", agm: "Olson", futureAGM: "Olson", analyst: "Ritter" },
    { name: "Lindwood", initials: "LW", agm: "Renwick", futureAGM: "Renwick", analyst: "LeMarie" },
    { name: "Queenstown", initials: "QTL", agm: "Stewart", futureAGM: "Stewart", analyst: "Tubridy" },
    { name: "The Pines", initials: "PML", agm: "Renwick", futureAGM: "Renwick", analyst: "Tubridy" },
    { name: "The Woods", initials: "WCR", agm: "Olson", futureAGM: "Olson", analyst: "Tubridy" },
    { name: "Tyrone", initials: "CCT", agm: "Coulter", futureAGM: "Coulter", analyst: "LeMarie" },
    { name: "York", initials: "RFF", agm: "Olson", futureAGM: "Olson", analyst: "Tubridy" },
];
