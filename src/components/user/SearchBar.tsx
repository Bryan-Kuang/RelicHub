import React, { useState } from "react";
import { Input, Select, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { Search } = Input;
const { Option } = Select;

interface SearchBarProps {
  onSearch: (value: string, language: "zh" | "en") => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const { t, i18n } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const [searchLanguage, setSearchLanguage] = useState<"zh" | "en">(
    i18n.language as "zh" | "en"
  );

  const handleSearch = () => {
    onSearch(searchValue, searchLanguage);
  };

  const selectBefore = (
    <Select
      defaultValue={searchLanguage}
      onChange={(value) => setSearchLanguage(value)}
      className="w-24"
    >
      <Option value="zh">中文</Option>
      <Option value="en">English</Option>
    </Select>
  );

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <Search
        addonBefore={selectBefore}
        placeholder={t("user.searchPlaceholder")}
        enterButton={
          <Button type="primary" icon={<SearchOutlined />}>
            {t("common.search")}
          </Button>
        }
        size="large"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
