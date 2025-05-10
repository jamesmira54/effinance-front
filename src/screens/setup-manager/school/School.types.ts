import { SelectOption } from "@/components/Inputs/Select/Select.types";

export interface SchoolFormProps {
    name: string;
    provinceId: SelectOption | null;
    cityMunId: SelectOption | null;
    brgyId: SelectOption | null;
    schoolType: SelectOption | null;
}

export interface SchoolDataProps {
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

export interface RegionProps {
    id: number;
    psgcCode: string;
    regDesc: string;
    regCode: string;
}

export interface ProvinceProps {
    id: number;
    psgcCode: string;
    regCode: string;
    provDesc: string;
    provCode: string;
}

export interface CityMunProps {
    id: number;
    psgcCode: string;
    regDesc: string;
    provCode: string;
    citymunDesc: string;
    citymunCode: string;
}

export interface BrgyProps {
    id: number;
    regCode: string;
    provCode: string;
    citymunCode: string;
    brgyCode: string;
    brgyDesc: string;
}

export interface AddressesProps {
    regions: RegionProps[];
    provinces: ProvinceProps[];
    cities: CityMunProps[];
    barangays: BrgyProps[];
}