// 导出来自routing.ts的所有内容
export * from "./routing";

// 获取消息加载器
export async function getMessages(locale: string) {
  return (await import(`../messages/${locale}.json`)).default;
}
