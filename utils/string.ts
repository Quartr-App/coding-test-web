export const companyNameInitials = (companyName: string) => {
  const nameParts = companyName.split(" ")

  const firstInitial = nameParts.at(0)?.at(0) ?? ""

  const additionalText = nameParts.at(-1) ? ` ${nameParts.at(-1)?.at(0)}` : nameParts.at(0)?.slice(1, 3)

  return firstInitial + additionalText
}

