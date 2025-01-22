defmodule Solution do
  @spec max_score(s :: String.t()) :: integer
  def max_score(s) do
    split = s |> String.split("", trim: true)
    oneCount = split |> Enum.frequencies() |> Map.get("1", 0)
    getScore(hd(split), tl(split), 0, oneCount, 0)
  end

  def getScore(_, [], _, _, cMax) do
    cMax
  end

  def getScore("0", tail, cZeroes, cOnes, cMax) do
    cZeroes = cZeroes + 1
    cMax = max(cMax, cZeroes + cOnes)
    getScore(hd(tail), tl(tail), cZeroes, cOnes, cMax)
  end

  def getScore("1", tail, cZeroes, cOnes, cMax) do
    cOnes = cOnes - 1
    cMax = max(cMax, cZeroes + cOnes)
    getScore(hd(tail), tl(tail), cZeroes, cOnes, cMax)
  end
end

s = "011101"
# Output: 5
IO.inspect(Solution.max_score(s))
s = "00111"
# Output: 5
IO.inspect(Solution.max_score(s))
s = "1111"
# Output: 3
IO.inspect(Solution.max_score(s))
