export interface APISchoolListRes {

}

export interface APISchoolPayload {
    name: string;
    schoolType: string;
    provinceId: number;
    cityMunId: number;
    brgyId: number;
}


export interface SchoolListProps {
    id: string;
    name: string;
    provinceId: number;
    provinceName: string;
    cityMunId: number;
    cityMunName: string;
    brgyId: number;
    brgyName: string;
    schoolType: string;
}