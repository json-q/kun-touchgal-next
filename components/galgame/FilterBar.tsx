'use client'

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/dropdown'
import { Button } from '@nextui-org/button'
import { Card, CardHeader } from '@nextui-org/card'
import { Select, SelectItem } from '@nextui-org/select'
import { ArrowDownAZ, ArrowUpAZ, ChevronDown, Filter } from 'lucide-react'
import {
  ALL_SUPPORTED_TYPE,
  SUPPORTED_TYPE_MAP,
  ALL_SUPPORTED_LANGUAGE,
  SUPPORTED_LANGUAGE_MAP,
  ALL_SUPPORTED_PLATFORM,
  SUPPORTED_PLATFORM_MAP
} from '~/constants/resource'
import type { SortField, SortOrder } from './_sort'

interface Props {
  selectedType: string
  setSelectedType: (types: string) => void
  sortField: SortField
  setSortField: (option: SortField) => void
  sortOrder: SortOrder
  setSortOrder: (direction: SortOrder) => void
  selectedLanguage: string
  setSelectedLanguage: (language: string) => void
  selectedPlatform: string
  setSelectedPlatform: (platform: string) => void
}

const sortFieldLabelMap: Record<string, string> = {
  created: '创建时间',
  view: '浏览量',
  download: '下载量',
  favorite: '收藏量'
}

export const FilterBar = ({
  selectedType,
  setSelectedType,
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
  selectedLanguage,
  setSelectedLanguage,
  selectedPlatform,
  setSelectedPlatform
}: Props) => {
  return (
    <Card className="w-full border border-default-100 bg-content1/50 backdrop-blur-lg">
      <CardHeader>
        <div className="flex flex-col w-full gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Select
            label="类型筛选"
            placeholder="选择类型"
            selectedKeys={[selectedType]}
            onChange={(event) => {
              if (!event.target.value) {
                return
              }
              setSelectedType(event.target.value)
            }}
            startContent={<Filter className="size-4 text-default-400" />}
            radius="lg"
            size="sm"
          >
            {ALL_SUPPORTED_TYPE.map((type) => (
              <SelectItem key={type} value={type} className="text-default-700">
                {SUPPORTED_TYPE_MAP[type]}
              </SelectItem>
            ))}
          </Select>

          <Select
            label="语言筛选"
            placeholder="选择语言"
            selectedKeys={[selectedLanguage]}
            onChange={(event) => {
              if (!event.target.value) {
                return
              }
              setSelectedLanguage(event.target.value)
            }}
            startContent={<Filter className="size-4 text-default-400" />}
            radius="lg"
            size="sm"
          >
            {ALL_SUPPORTED_LANGUAGE.map((language) => (
              <SelectItem
                key={language}
                value={language}
                className="text-default-700"
              >
                {SUPPORTED_LANGUAGE_MAP[language]}
              </SelectItem>
            ))}
          </Select>

          <Select
            label="平台筛选"
            placeholder="选择平台"
            selectedKeys={[selectedPlatform]}
            onChange={(event) => {
              if (!event.target.value) {
                return
              }
              setSelectedPlatform(event.target.value)
            }}
            startContent={<Filter className="size-4 text-default-400" />}
            radius="lg"
            size="sm"
          >
            {ALL_SUPPORTED_PLATFORM.map((platform) => (
              <SelectItem
                key={platform}
                value={platform}
                className="text-default-700"
              >
                {SUPPORTED_PLATFORM_MAP[platform]}
              </SelectItem>
            ))}
          </Select>

          <div className="flex items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="flat"
                  style={{
                    fontSize: '0.875rem'
                  }}
                  endContent={<ChevronDown className="size-4" />}
                  radius="lg"
                  size="lg"
                >
                  {sortFieldLabelMap[sortField]}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="排序选项"
                selectedKeys={new Set([sortField])}
                onAction={(key) => setSortField(key as SortField)}
                selectionMode="single"
                className="min-w-[120px]"
              >
                <DropdownItem key="created" className="text-default-700">
                  创建时间
                </DropdownItem>
                <DropdownItem key="view" className="text-default-700">
                  浏览量
                </DropdownItem>
                <DropdownItem key="download" className="text-default-700">
                  下载量
                </DropdownItem>
                <DropdownItem key="favorite" className="text-default-700">
                  收藏量
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            <Button
              variant="flat"
              style={{
                fontSize: '0.875rem'
              }}
              onPress={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              startContent={
                sortOrder === 'asc' ? (
                  <ArrowUpAZ className="size-4" />
                ) : (
                  <ArrowDownAZ className="size-4" />
                )
              }
              radius="lg"
              size="lg"
            >
              {sortOrder === 'asc' ? '升序' : '降序'}
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}
