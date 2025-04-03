export type Tab = {
    label: string;
    content: React.ReactNode;
  };
  
export type TabsProps = {
    tabs: Tab[];
};