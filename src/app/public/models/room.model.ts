export class RoomModel {
    constructor (
        public poke_name: string,
        public gym_name: string,
        public place: string,
        public match_hour: Date,
        public host: RoomMember,
        public cords?: Cords,
        public placed_members?: User[],
        public remote_members?: User[],
        public invited_members?: User[],
        public id?: string,
    ) {
        
    }
}

export interface User {
    email: string,
    uid: string,
}

export interface RoomMember {
    nickname: string,
    pg_code: string,
}

export interface Cords {
    lat: number,
    long: number
}